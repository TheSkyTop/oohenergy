import unittest
from collect_reports import Links, canonical


class DiscoveryTests(unittest.TestCase):
    def test_extensionless_document_and_nested_label(self):
        parser = Links()
        parser.feed('<a href="/-/media/summer/2026-27-outlook"><span>Summer</span> Outlook</a>')
        self.assertEqual(parser.links, [('/-/media/summer/2026-27-outlook', 'Summer Outlook')])

    def test_query_and_fragment_do_not_duplicate_document(self):
        self.assertEqual(canonical('https://aemo.com.au/-/media/report?download=1#page=2'), canonical('https://www.aemo.com.au/-/media/report'))

    def test_non_official_links_are_rejected(self):
        with self.assertRaises(ValueError):
            canonical('https://www.aemo.com.au.example.com/report')


if __name__ == '__main__':
    unittest.main()
